import { render } from '@testing-library/react'
import rerender from 'react-test-renderer'

import { useGlobalContext, Global, ErrorPage } from '@global'
import { useEffect } from 'react'

describe('hocs', () => {
  describe('Global', () => {
    it('should render the global hoc correctly', async () => {
      const wrapper = rerender.create(<Global>Test</Global>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should refresh the page', async () => {
      const INIT_RENDER_COUNT = 0
      let renderCount = INIT_RENDER_COUNT
      const Test = () => {
        renderCount++ // Increment render count
        const { refreshPage } = useGlobalContext()

        useEffect(() => {
          refreshPage() // Refresh page - Increment render count
        }, [])
        return <div>Test</div>
      }

      await render(
        <Global>
          <Test />
        </Global>
      )
      expect(renderCount).toBe(2)
    })
  })
})
