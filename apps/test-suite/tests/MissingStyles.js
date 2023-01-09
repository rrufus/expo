import React from 'react';
import { StyleSheet, View } from 'react-native';

import { mountAndWaitFor as originalMountAndWaitFor } from './helpers';

export const name = 'missing-styles';

const styles = StyleSheet.create({
  numericallyInvalid: {
    borderBottomWidth: '1rem',
    borderEndWidth: '1rem',
    borderLeftWidth: '1rem',
    borderRightWidth: '1rem',
    borderStartWidth: '1rem',
    borderTopWidth: '1rem',
    columnGap: '1rem',
    borderWidth: '1rem',
    bottom: '1rem',
    end: '1rem',
    gap: '1rem',
    height: '1rem',
    inset: '1rem',
    insetBlock: '1rem',
    insetBlockEnd: '1rem',
    insetBlockStart: '1rem',
    insetInline: '1rem',
    insetInlineEnd: '1rem',
    insetInlineStart: '1rem',
    left: '1rem',
    margin: '1rem',
    marginBlock: '1rem',
    marginBlockEnd: '1rem',
    marginBlockStart: '1rem',
    marginBottom: '1rem',
    marginEnd: '1rem',
    marginHorizontal: '1rem',
    marginInline: '1rem',
    marginInlineEnd: '1rem',
    marginInlineStart: '1rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginStart: '1rem',
    marginTop: '1rem',
    marginVertical: '1rem',
    maxHeight: '1rem',
    maxWidth: '1rem',
    minHeight: '1rem',
    minWidth: '1rem',
    padding: '1rem',
    paddingBlock: '1rem',
    paddingBlockEnd: '1rem',
    paddingBlockStart: '1rem',
    paddingBottom: '1rem',
    paddingEnd: '1rem',
    paddingHorizontal: '1rem',
    paddingInline: '1rem',
    paddingInlineEnd: '1rem',
    paddingInlineStart: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    paddingStart: '1rem',
    paddingTop: '1rem',
    paddingVertical: '1rem',
    position: '1rem',
    right: '1rem',
    rowGap: '1rem',
    start: '1rem',
    top: '1rem',
    width: '1rem',
    zIndex: '1rem',
    shadowOpacity: '1rem',
    borderBottomEndRadius: '1rem',
    borderBottomLeftRadius: '1rem',
    borderBottomRightRadius: '1rem',
    borderBottomStartRadius: '1rem',
    borderEndEndRadius: '1rem',
    borderEndStartRadius: '1rem',
    borderRadius: '1rem',
    borderStartEndRadius: '1rem',
    borderStartStartRadius: '1rem',
    borderTopEndRadius: '1rem',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    borderTopStartRadius: '1rem',
    opacity: '1rem',
    fontSize: '1rem',
    letterSpacing: '1rem',
    lineHeight: '1rem',
    textShadowRadius: '1rem',
  },
  position: {
    position: 'fixed',
  },

  grid: {
    grid: 'auto-flow / 1fr 1fr 1fr',
    gridArea: '1 / 1 / 2 / 3',
    gridAutoColumns: 'minmax(10px, auto)',
    gridAutoFlow: 'column',
    gridAutoRows: 'minmax(10px, auto)',
    gridColumnEnd: '3',
    gridColumnGap: '1mm',
    gridColumnStart: 'span 2',
    gridRow: '1 / 3',
    gridRowEnd: 'span 2',
    gridRowGap: '1rem',
    gridRowStart: '1',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gridTemplateAreas: ['b b a', 'b b c', 'b b c'],
  },
  transition: {
    transitionDelay: '200ms',
    transitionDuration: 100,
    transitionProperty: ['backgroundColor', 'width'],
    transitionTimingFunction: ['ease', 'step-start', 'cubic-bezier(0.1, 0.7, 1, 0.1)'],
  },
  animation: {
    animationDelay: '2s',
    animationDirection: 'alternate',
    animationDuration: 300,
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationKeyframes: {
      '0%': { backgroundColor: 'blue' },
      '100%': { backgroundColor: 'red' },
    },
    animationName: 'myAnimation',
    animationPlayState: 'paused',
    animationTimingFunction: 'ease',
  },
  background: {
    backgroundAttachment: 'fixed',
    backgroundBlendMode: ['darken', 'luminosity'],
    backgroundClip: 'text',
    backgroundImage: 'url("https://i.imgur.com/removed.png")',
    backgroundOrigin: 'border-box',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },

  view: {
    backdropFilter: 'brightness(60%)',
    // TODO
    boxShadow: '10px 5px 5px black',

    boxSizing: 'content-box',
    clip: 'rect(0px, 0px, 0px, 0px)',
    cursor: 'alias',
    filter: 'blur(2px)',
    outline: '5px solid rgba(255, 0, 0, 0.5)',
    outlineColor: 'dodgerblue',
    overflowX: 'hidden',
    overflowY: 'hidden',
    overscrollBehavior: 'contain',
    overscrollBehaviorX: 'contain',
    overscrollBehaviorY: 'contain',
    perspective: '100px',
    perspectiveOrigin: '50% 50%',
    touchAction: 'auto',
    transformOrigin: '0% 50%',
    transformStyle: 'preserve-3d',
    visibility: 'visible',
    willChange: 'auto',
  },
});

function createMockFunction() {
  const history = [];
  const fn = function (...args) {
    history.push(args);
  };
  fn.history = history;
  return fn;
}

export async function test(
  { it, describe, beforeAll, jasmine, afterAll, expect, afterEach, beforeEach },
  { setPortalChild, cleanupPortal }
) {
  afterEach(async () => {
    await cleanupPortal();
  });

  const mountAndWaitFor = (child, propName = 'onLayout') =>
    originalMountAndWaitFor(child, propName, setPortalChild);

  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = createMockFunction();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });

  describe(name, () => {
    // The purpose of this test is to prove that the device does not
    // fatally crash when using any of the unsupported CSS properties on native.
    it(`renders invalid styles`, async () => {
      await mountAndWaitFor(
        <>
          <View style={styles.animation} />
          <View style={styles.background} />
          <View style={styles.grid} />
          <View style={styles.numericallyInvalid} />
          <View style={styles.position} />
          <View style={styles.transition} />
          <View style={styles.view} />
        </>
      );
      expect(console.error.history).toEqual([]);
    });
  });
}
