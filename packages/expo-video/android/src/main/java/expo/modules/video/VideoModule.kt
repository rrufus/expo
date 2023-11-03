package expo.modules.video

import android.content.Context
import android.os.Looper
import androidx.media3.common.MediaItem
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.AspectRatioFrameLayout
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext

class VideoModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()
  private var currentVolume = 1f

  override fun definition() = ModuleDefinition {
    Name("ExpoVideo")

    View(VideoView::class) {
      Prop("player") { view, player: VideoPlayer? ->
        player?.let {
          view.player = it.ref
        }
      }

      Prop("nativeControls") { view, nativeControls: Boolean? ->
        view.playerView.useController = nativeControls ?: false
      }

      Prop("contentFit") { view, contentFit: VideoContentFit? ->
        view.playerView.resizeMode = contentFit?.toAspectRatioFrameLayout()
          ?: AspectRatioFrameLayout.RESIZE_MODE_FIT
      }

      AsyncFunction("enterFullscreen") { view: VideoView ->
        view.enterFullScreen()
      }

      AsyncFunction("exitFullscreen") { view: VideoView ->
        view.exitFullScreen()
      }

      OnViewDestroys { view: VideoView ->
        view.releasePlayer()
      }
    }

    Class(VideoPlayer::class) {
      Constructor { source: String? ->
        val player = ExoPlayer.Builder(context)
          .setLooper(Looper.getMainLooper())
          .build()

        if (source != null) {
          val item = MediaItem.fromUri(source)
          runOnMain {
            currentVolume = player.volume
            player.clearMediaItems()
            player.addMediaItem(item)
          }
        }

        VideoPlayer(player)
      }

      Property("isPlaying") { player: VideoPlayer ->
        return@Property runOnMain {
          player.ref.isPlaying
        }
      }

      Property("isMuted") { player: VideoPlayer ->
        return@Property runOnMain {
          player.ref.volume == 0.0f
        }
      }.set { player: VideoPlayer, isMuted: Boolean ->
        runOnMain {
          player.ref.volume = if (isMuted) 0.0f else currentVolume
        }
      }

      Function("play") { player: VideoPlayer ->
        runOnMain {
          player.ref.play()
        }
      }

      Function("pause") { player: VideoPlayer ->
        runOnMain {
          player.ref.pause()
        }
      }

      Function("seekBy") { player: VideoPlayer, seconds: Int ->
        runOnMain {
          player.ref.seekTo(player.ref.contentPosition + (seconds * 1000L))
        }
      }

      Function("replace") { player: VideoPlayer, source: String ->
        val newItem = MediaItem.fromUri(source)
        runOnMain {
          player.ref.replaceMediaItem(0, newItem)
          player.ref.play()
        }
      }

      Function("replay") { player: VideoPlayer ->
        runOnMain {
          player.ref.seekTo(0)
          player.ref.play()
        }
      }
    }
  }

  private fun <T> runOnMain(block: () -> T) = runBlocking {
    withContext(Dispatchers.Main) {
      block()
    }
  }
}

