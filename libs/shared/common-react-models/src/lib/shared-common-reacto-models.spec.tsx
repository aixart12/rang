import { render } from '@testing-library/react';

import SharedCommonReactoModels from './shared-common-reacto-models';

describe('SharedCommonReactoModels', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedCommonReactoModels />);
    expect(baseElement).toBeTruthy();
  });
});
