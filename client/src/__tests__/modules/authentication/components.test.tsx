import { act, fireEvent, render } from '@testing-library/react';
import { Brand, Form, FIELD, DEFAULT_VALUES } from '@authentication';

describe('components', () => {
  it('should render the Brand component correctly', () => {
    const { container } = render(<Brand />);
    expect(container).toMatchSnapshot();
  });

  describe('Form', () => {
    it('should render component correctly', () => {
      const { container } = render(
        <Form
          fieldList={FIELD.LOGIN}
          defaultValues={DEFAULT_VALUES.LOGIN}
          submitHandler={() => console.log('submit')}
          submitPlaceholder="Login"
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should call the submitHandler when the form is submitted', async () => {
      const submitHandler = jest.fn();
      const { container } = render(
        <Form
          fieldList={FIELD.LOGIN}
          defaultValues={DEFAULT_VALUES.LOGIN}
          submitHandler={submitHandler}
          submitPlaceholder="Login"
        />,
      );
      await act(() => {
        const form = container.querySelector('form');
        if (form) fireEvent.submit(form);
      });
      expect(submitHandler).toHaveBeenCalledTimes(1);
    });
  });
});
