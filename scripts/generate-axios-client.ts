import { codegen } from 'swagger-axios-codegen';
import * as fs from 'fs';
import 'dotenv/config';

/**
 * @description generates a swagger/open api doc which you can find at http://localhost:<port env variable>/api/
 */
async function codeGen() {
  await codegen({
    methodNameMode: 'operationId',
    remoteUrl: `http://localhost:${process.env.PORT}/api-json`,
    outputDir: './types',
    useStaticMethod: false,
    fileName: 'backend-swagger.ts',
    useHeaderParameters: false,
    strictNullChecks: true,
  });
  let content = fs.readFileSync('./types/backend-swagger.ts', 'utf-8');
  content = content.replace(/(\w+)Dto/g, '$1');
  fs.writeFileSync('./types/backend-swagger.ts', content);
}
void codeGen();
