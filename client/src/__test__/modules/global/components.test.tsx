import rerender from 'react-test-renderer'
import { Loader, Overlay } from '@global'

describe('components', () => {
  describe('Loader', () => {
    it('should render the loader correctly', () => {
      const loader = rerender.create(<Loader />)
      expect(loader).toMatchSnapshot()
    })
  })

  describe('Overlay', () => {
    it('should render the overlay correctly', async () => {
      const overlay = rerender.create(
        <Overlay exitHandler={() => {}}>
          <div>Test</div>
        </Overlay>
      )
      expect(overlay).toMatchSnapshot()
    })
  })
})
