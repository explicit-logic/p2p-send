// Modules
import * as yup from 'yup';

// Types
// import type { TokensList } from 'marked';

export function getValidationSchema(/* tokensList: TokensList */) {
  const schema = {};

  return yup.object().shape(schema);
}
