import { fireEvent, render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { Brand, Form, FIELD, DEFAULT_VALUES } from '@authentication'

describe('components', () => {
  it('should render the Brand component correctly', () => {
    const brand = renderer.create(<Brand />)
    expect(brand).toMatchSnapshot()
  })

  describe('Form', () => {
    it('should render component correctly', () => {
      const form = renderer.create(
        <Form
          fieldList={FIELD.LOGIN}
          defaultValues={DEFAULT_VALUES.LOGIN}
          submitHandler={() => console.log('submit')}
          submitPlaceholder="Login"
        />
      )
      expect(form).toMatchSnapshot()
    })

    it('should call the submitHandler when the form is submitted', async () => {
      const submitHandler = jest.fn()
      const { container } = await render(
        <Form
          fieldList={FIELD.LOGIN}
          defaultValues={DEFAULT_VALUES.LOGIN}
          submitHandler={submitHandler}
          submitPlaceholder="Login"
        />
      )
      const form = container.querySelector('form')
      if (form) await fireEvent.submit(form)
      expect(submitHandler).toHaveBeenCalledTimes(1)
    })
  })
})
