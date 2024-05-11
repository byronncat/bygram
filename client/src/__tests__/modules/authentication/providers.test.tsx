import { useClassNameContext, ClassNameProvider } from '@authentication'
import { renderHook, render } from '@testing-library/react'

describe('Providers', () => {
  describe('ClassName', () => {
    it('should return className object', async () => {
      const wrapper = ({ children }) => (
        <ClassNameProvider>{children}</ClassNameProvider>
      )
      const { result } = await renderHook(() => useClassNameContext(), {
        wrapper,
      })

      expect(result.current.className).toMatchSnapshot()
    })
  })
})
