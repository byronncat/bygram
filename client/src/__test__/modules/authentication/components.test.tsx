import { Brand, Form, FIELD, DEFAULT_VALUES } from '@authentication'
import renderer from 'react-test-renderer'

describe('components', () => {
  it('should render the Brand component correctly', () => {
    const brand = renderer.create(<Brand />)
    expect(brand).toMatchSnapshot()
  })

  it('should render the Form component correctly', () => {
    const submitHandler = jest.fn()

    const form = renderer.create(
      <Form
        fieldList={FIELD.LOGIN}
        defaultValues={DEFAULT_VALUES.LOGIN}
        submitHandler={submitHandler}
        submitPlaceholder="Login"
      />
    )
    expect(form).toMatchSnapshot()
  })
})
