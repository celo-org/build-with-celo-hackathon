-- Moola V2 Dashboard Queries

/** 
** Number Charts:
**/

-- Total Users
SELECT count(distinct "moola_v2"."deposits"."from_address") AS "count"
FROM "moola_v2"."deposits"

-- Total Deposit Transactions
SELECT count(*) AS "count"
FROM "moola_v2"."deposits"

-- Total Borrow Transactions
SELECT count(*) AS "count"
FROM "moola_v2"."borrows"

-- Total Deposits(mCELO/mCUSD/mCEUR)
SELECT sum("moola_v2"."deposits"."amount") AS "sum"
FROM "moola_v2"."deposits"

-- Current Deposits(mCELO/mCUSD/mCEUR)
SELECT sum("moola_v2"."reserves"."total_deposits") AS "sum"
FROM "moola_v2"."reserves"

-- Total Borrow(mCELO/mCELO/mCUSD)
SELECT sum("moola_v2"."borrows"."amount") AS "sum"
FROM "moola_v2"."borrows"

/**
** Combo (Bar+Line) Charts:
**/

-- Monthly Deposits Volume
SELECT date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) AS "block_timestamp", "source"."Token Name" AS "Token Name", sum("source"."amount") AS "sum"
FROM (SELECT "moola_v2"."deposits"."amount" AS "amount", "moola_v2"."deposits"."block_timestamp" AS "block_timestamp", concat('m', "Reserves"."symbol") AS "Token Name" FROM "moola_v2"."deposits"
LEFT JOIN "moola_v2"."reserves" "Reserves" ON "moola_v2"."deposits"."reserve" = "Reserves"."id") "source"
GROUP BY date_trunc('month', CAST("source"."block_timestamp" AS timestamp)), "source"."Token Name"
ORDER BY date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) ASC, "source"."Token Name" ASC

-- Monthly Borrow Volume
SELECT date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) AS "block_timestamp", "source"."Token" AS "Token", sum("source"."amount") AS "sum"
FROM (SELECT "moola_v2"."borrows"."amount" AS "amount", "moola_v2"."borrows"."block_timestamp" AS "block_timestamp", concat('m', "Reserves"."symbol") AS "Token" FROM "moola_v2"."borrows"
LEFT JOIN "moola_v2"."reserves" "Reserves" ON "moola_v2"."borrows"."reserve" = "Reserves"."id") "source"
GROUP BY date_trunc('month', CAST("source"."block_timestamp" AS timestamp)), "source"."Token"
ORDER BY date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) ASC, "source"."Token" ASC

/**
** Bar Charts:
**/

-- Deposit Volume - 24h
SELECT "source"."Token" AS "Token", sum("source"."amount") AS "sum"
FROM (SELECT "moola_v2"."deposits"."amount" AS "amount", "moola_v2"."deposits"."block_timestamp" AS "block_timestamp", concat('m', "Reserves"."symbol") AS "Token" FROM "moola_v2"."deposits"
LEFT JOIN "moola_v2"."reserves" "Reserves" ON "moola_v2"."deposits"."reserve" = "Reserves"."id") "source"
WHERE ("source"."block_timestamp" >= CAST((CAST(now() AS timestamp) + (INTERVAL '-1 day')) AS date)
   AND "source"."block_timestamp" < CAST(now() AS date))
GROUP BY "source"."Token"
ORDER BY "source"."Token" ASC

-- Borrow Volume - 24h
SELECT "source"."Token" AS "Token", sum("source"."amount") AS "sum"
FROM (SELECT "moola_v2"."borrows"."amount" AS "amount", concat('m', "Reserves"."symbol") AS "Token", "moola_v2"."borrows"."block_timestamp" AS "block_timestamp" FROM "moola_v2"."borrows"
LEFT JOIN "moola_v2"."reserves" "Reserves" ON "moola_v2"."borrows"."reserve" = "Reserves"."id") "source"
WHERE ("source"."block_timestamp" >= CAST((CAST(now() AS timestamp) + (INTERVAL '-1 day')) AS date)
   AND "source"."block_timestamp" < CAST(now() AS date))
GROUP BY "source"."Token"
ORDER BY "source"."Token" ASC

-- Current Deposits
SELECT "source"."total_deposits" AS "total_deposits", "source"."Token" AS "Token"
FROM (SELECT "moola_v2"."reserves"."total_deposits" AS "total_deposits", concat('m', "moola_v2"."reserves"."symbol") AS "Token" FROM "moola_v2"."reserves") "source"
LIMIT 1048575

-- Current Borrow
SELECT "source"."Token" AS "Token", "source"."Total Borrow" AS "Total Borrow"
FROM (SELECT concat('m', "moola_v2"."reserves"."symbol") AS "Token", ("moola_v2"."reserves"."total_current_variable_debt" + "moola_v2"."reserves"."total_principal_stable_debt") AS "Total Borrow" FROM "moola_v2"."reserves") "source"
LIMIT 1048575

-- Available Liquidity
SELECT "source"."symbol" AS "symbol", "source"."Available liquidity" AS "Available liquidity", "source"."Token" AS "Token"
FROM (SELECT "moola_v2"."reserves"."symbol" AS "symbol", ("moola_v2"."reserves"."total_deposits" - ("moola_v2"."reserves"."total_current_variable_debt" + "moola_v2"."reserves"."total_principal_stable_debt")) AS "Available liquidity", concat('m', "moola_v2"."reserves"."symbol") AS "Token" FROM "moola_v2"."reserves") "source"
LIMIT 1048575

-- Active User By Tokens
SELECT "source"."Token" AS "Token", "source"."count" AS "count"
FROM (SELECT "source"."Token" AS "Token", count(distinct "source"."user") AS "count"
FROM (SELECT "moola_v2"."user_reserves"."user" AS "user", concat('m', "Reserves"."symbol") AS "Token" FROM "moola_v2"."user_reserves"
LEFT JOIN "moola_v2"."reserves" "Reserves" ON "moola_v2"."user_reserves"."reserve" = "Reserves"."id") "source"
GROUP BY "source"."Token") "source"
LIMIT 1048575

/**
** Line Charts:
**/

-- Current Variable Borrow by Token
SELECT "source"."name" AS "name", "source"."total_current_variable_debt" AS "total_current_variable_debt", "source"."Token Name " AS "Token Name "
FROM (SELECT "moola_v2"."reserves"."name" AS "name", "moola_v2"."reserves"."total_current_variable_debt" AS "total_current_variable_debt", concat('m', "moola_v2"."reserves"."symbol") AS "Token Name " FROM "moola_v2"."reserves") "source"
LIMIT 1048575

-- Current Stable Borrow by Token
SELECT "source"."total_principal_stable_debt" AS "total_principal_stable_debt", "source"."Token" AS "Token"
FROM (SELECT "moola_v2"."reserves"."total_principal_stable_debt" AS "total_principal_stable_debt", concat('m', "moola_v2"."reserves"."symbol") AS "Token" FROM "moola_v2"."reserves") "source"
LIMIT 1048575
