const devProd = (devKey: string, prodKey: string) => {
	if (process.env.NODE_ENV !== 'production') return devKey;
	else return prodKey;
};

export const CLEINT_URL = devProd('http://localhost:3000', '');

export const DB_ENTITIES_DIR_DEV = devProd('src/entity/**/*.ts', '');
export const DB_MIGRATION_DIR_DEV = devProd('src/migration/**/*.ts', '');
export const DB_SUB_DIR_DEV = devProd('src/subscriber/**/*.ts', '');
export const DB_ENTITIES_DIR_PROD = devProd('build/entity/**/*.js', '');
export const DB_MIGRATION_DIR_PROD = devProd('build/migration/**/*.js', '');
export const DB_SUB_DIR_PROD = devProd('build/subscriber/**/*.js', '');
export const DB_ENTITIES_CLI_DIR_DEV = devProd('src/entity', '');
export const DB_MIGRATION_CLI_DIR_DEV = devProd('src/migration', '');
export const DB_SUB_CLI_DIR_DEV = devProd('src/subscriber', '');
export const DB_ENTITIES_CLI_DIR_PROD = devProd('build/entity', '');
export const DB_MIGRATION_CLI_DIR_PROD = devProd('build/migration', '');
export const DB_SUB_CLI_DIR_PROD = devProd('build/subscriber', '');
