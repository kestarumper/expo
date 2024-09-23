import { render } from '@testing-library/react-native';
import React from 'react';
import { Platform, Text, View } from 'react-native';

import { Pressable } from '../../views/Pressable';
import { Link } from '../Link';

// Render and observe the props of the Link component.

it('renders a Link', () => {
  const { getByText } = render(<Link href="/foo">Foo</Link>);
  const node = getByText('Foo');
  expect(node).toBeDefined();
  expect(node.props.href).toBe('/foo');
  expect(node.props).toEqual({
    children: 'Foo',
    href: '/foo',
    onPress: expect.any(Function),
    role: 'link',
  });
});

it('renders a Link with React Native array style prop when using asChild', () => {
  const { getByTestId } = render(
    <Link asChild testID="link" href="/foo" style={[{ color: 'red' }, { backgroundColor: 'blue' }]}>
      <Pressable>
        <Text>Foo</Text>
      </Pressable>
    </Link>
  );
  const node = getByTestId('link');
  expect(node).toBeDefined();
  expect(node.props.style).toStrictEqual({
    color: 'red',
    backgroundColor: 'blue',
  });
});

xit('renders a Link with a slot', () => {
  const { getByText, getByTestId } = render(
    <Link asChild href="/foo">
      <View testID="pressable">
        <Text testID="inner-text">Button</Text>
      </View>
    </Link>
  );
  const node = getByText('Button');
  expect(node.props).toEqual({
    children: 'Button',
    testID: 'inner-text',
  });

  const pressable = getByTestId('pressable');
  if (Platform.OS === 'web') {
    expect(pressable.props).toEqual(
      expect.objectContaining({
        children: expect.anything(),
        href: '/foo',
        role: 'link',
        testID: 'pressable',
        onClick: expect.any(Function),
      })
    );
  } else {
    expect(pressable.props).toEqual(
      expect.objectContaining({
        children: expect.anything(),
        href: '/foo',
        role: 'link',
        testID: 'pressable',
        onPress: expect.any(Function),
      })
    );
  }
});

it('ignores className on native', () => {
  const { getByTestId } = render(
    <Link href="/foo" testID="link" style={{ color: 'red' }} className="xxx">
      Hello
    </Link>
  );
  const node = getByTestId('link');
  expect(node.props).toEqual(
    expect.objectContaining({
      children: 'Hello',
      className: 'xxx',
      href: '/foo',
      role: 'link',
      style: { color: 'red' },
      testID: 'link',
      onPress: expect.any(Function),
    })
  );
});

it('ignores className with slot on native', () => {
  const { getByTestId } = render(
    <Link asChild href="/foo" testID="link" style={{ color: 'red' }} className="xxx">
      <View />
    </Link>
  );
  const node = getByTestId('link');
  expect(node.props).toEqual(
    expect.objectContaining({
      children: undefined,
      className: 'xxx',
      href: '/foo',
      role: 'link',
      style: { color: 'red' },
      testID: 'link',
      onPress: expect.any(Function),
    })
  );
});
it('strips web-only href attributes', () => {
  const { getByTestId } = render(
    <Link
      href="/foo"
      testID="link"
      style={{ color: 'red' }}
      download="file.png"
      rel="noopener"
      target="_blank">
      Link
    </Link>
  );
  const node = getByTestId('link');
  expect(node.props).toEqual(
    expect.objectContaining({
      children: 'Link',
      href: '/foo',
      role: 'link',
      style: { color: 'red' },
      testID: 'link',
      onPress: expect.any(Function),
    })
  );
});
