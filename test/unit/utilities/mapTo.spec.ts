import { SuccessDTO } from '../../../src/dtos/shared/success.dto';
import { mapTo } from '../../../src/utilities/mapTo';

describe('Testing mapTo', () => {
  it('should successfully map to a DTO', () => {
    expect(mapTo(SuccessDTO, { success: true })).toEqual({ success: true });
  });
});
