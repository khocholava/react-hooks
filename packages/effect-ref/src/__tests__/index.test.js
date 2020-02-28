/* eslint-disable react/jsx-no-bind */
import {render} from '@testing-library/react';
import {useEffectRef} from '../index';

const Foo = ({onRef}) => {
    const ref = useEffectRef(onRef);
    return <div ref={ref} />;
};

test('call on mount', () => {
    const callback = jest.fn();
    render(<Foo onRef={callback} />);
    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0] instanceof HTMLElement).toBe(true);
});

test('dispose on unmount', () => {
    const dispose = jest.fn();
    const callback = () => dispose;
    const {unmount} = render(<Foo onRef={callback} />);
    unmount();
    expect(dispose).toHaveBeenCalled();
});