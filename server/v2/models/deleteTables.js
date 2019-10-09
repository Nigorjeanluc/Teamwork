import pool from './dbConnect';
import delTable from './allqueries';

const deleteTables = async() => {
    await pool.query(delTable.deleteAllTables);
    process.stdout.write('Three Tables (employees ,articles and comments) tables. Deleted successfully\n');
};

func.execQuery(deleteTables);

export default deleteTables;