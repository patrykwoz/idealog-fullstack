import { render, screen } from '@testing-library/react'
import CloseButtonSmall from '@/app/ui/buttons/close-button-small'
import { it } from 'vitest'

describe('CloseButtonSmall', () => {
    it('renders the CloseButtonSmall component', () => {
        render(<CloseButtonSmall />)
    })
})


