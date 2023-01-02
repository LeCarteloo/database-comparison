<?php

declare(strict_types=1);

use Cog\Laravel\Clickhouse\Migration\AbstractClickhouseMigration;

return new class extends AbstractClickhouseMigration
{
    public function up(): void
    {
        $this->clickhouseClient->write(
            <<<SQL
                CREATE TABLE IF NOT EXISTS titles (
                    employee_id UInt64,
                    title String,
                    from_date Date,
                    to_date Date
                ) ENGINE = MergeTree ORDER BY employee_id;
            SQL
        );
    }
};
