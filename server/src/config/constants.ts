const devProd = (devKey: string, prodKey: string) => {
	if (process.env.NODE_ENV !== 'production') return devKey;
	else return prodKey;
};

export const CLEINT_URL = devProd('http://localhost:3000', '');

export const JWT_SECRET = process.env.JWT_SECRET!;

export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWROD = process.env.DB_PASSWORD;
export const DB_ENTITIES_DIR = devProd('src/entity/**/*.ts', 'build/entity/**/*.js');
export const DB_MIGRATION_DIR = devProd(
	'src/migration/**/*.ts',
	'build/migration/**/*.js'
);
export const DB_SUB_DIR = devProd('src/subscriber/**/*.ts', 'build/subscriber/**/*.js');
export const DB_SUB_CLI_DIR = devProd('src/subscriber', 'build/subscriber');
