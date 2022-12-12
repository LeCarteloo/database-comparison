<?php

declare(strict_types=1);

use Cog\Laravel\Clickhouse\Migration\AbstractClickhouseMigration;

return new class extends AbstractClickhouseMigration
{
    public function up(): void
    {
        $this->clickhouseClient->write(
            <<<SQL
                CREATE TABLE IF NOT EXISTS employees (
                    id UInt64,
                    birth_date Date,
                    first_name String,
                    last_name String,
                    gender Enum('M' = 1, 'F' = 2),
                    hire_date Date
                ) ENGINE = MergeTree ORDER BY id;
            SQL
        );
    }
};
