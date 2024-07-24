import { render, screen } from '@testing-library/react'
import Home from '../app/page'
import { it } from 'vitest'

describe('Home', () => {
    it('renders the Home component', () => {
        render(<Home />)
        expect(screen.getByText('Explore', {exact: false})).toBeInTheDocument();
    })
})


