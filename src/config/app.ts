import dotenv from 'dotenv';
dotenv.config();
export const jwtSecretKey=process.env.JWT_SECRET_KEY||'InstrumentationKey=fa0e1a1f-4981-4686-bef7-85056d7944e6;IngestionEndpoint=https://southindia-0.in.applicationinsights.azure.com/;LiveEndpoint=https://southindia.livediagnostics.monitor.azure.com/'
