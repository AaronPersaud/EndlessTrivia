import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { EndlessTrivia } from '../components/EndlessTrivia';

describe('EndlessTrivia', () => {
    it('renders EndlessTrivia component', () => {
        render(<EndlessTrivia />);

        expect(screen.getByText('Score: 0')).toBeInTheDocument();
    })
})