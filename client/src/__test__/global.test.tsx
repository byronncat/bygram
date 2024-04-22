import { render } from '@testing-library/react'

import { uri, useGlobalContext, Global, Loader, Overlay } from '@global'
import { useEffect } from 'react'

describe('api', () => {
  describe('server', () => {
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache
      process.env = { ...OLD_ENV } // Make a copy
    })

    afterAll(() => {
      process.env = OLD_ENV // Restore old environment
    })

    it('should return local uri', () => {
      const { REACT_APP_API_URL, ...rest } = process.env
      process.env = { ...rest }

      const path = uri.getHostingServer('/api/test')
      expect(path).toBe('/api/test')
    })

    it('should return hosting server uri', () => {
      process.env.REACT_APP_API_URL = 'https://example.com'

      const path = uri.getHostingServer('/api/test')
      expect(path).toBe('https://example.com/api/test')
    })
  })

  it('should format image CDN correctly', () => {
    const path = uri.transformImageCDN(
      'https://res.cloudinary.com/demo/image/upload/v1626321412/demo.jpg',
      'w_100,fl_lossy,q_auto'
    )

    expect(path).toBe(
      'https://res.cloudinary.com/demo/image/upload/w_100,fl_lossy,q_auto/demo.jpg'
    )
  })
})

describe('components', () => {
  describe('Loader', () => {
    it('should render the loader correctly', () => {
      const { container } = render(<Loader />)
      expect(container).toMatchSnapshot()
    })
  })

  describe('Overlay', () => {
    it('should render the overlay correctly', () => {
      const { container } = render(<Overlay exitHandler={() => {}} />)
      expect(container).toMatchSnapshot()
    })
  })
})

describe('hocs', () => {
  describe('Global', () => {
    it('should render the global hoc correctly', () => {
      const { container } = render(<Global>Test</Global>)
      expect(container).toMatchSnapshot()
    })

    it('should refresh the page', () => {
      let renderCount = -1
      const Test = () => {
        renderCount++
        const { refreshPage } = useGlobalContext()

        useEffect(() => {
          refreshPage()
        }, [])
        return <div>Test</div>
      }

      render(
        <Global>
          <Test />
        </Global>
      )
      expect(renderCount).toBe(1)
    })
  })
})

describe('pages', () => {
  // it('should render the 404 page correctly', () => {
  //   const { container } = render(
  //     <Router>
  //       <ErrorPage />
  //     </Router>
  //   )
  //   expect(container).toMatchSnapshot()
  // })
})
