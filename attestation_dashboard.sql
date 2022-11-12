-- Attested account
SELECT count(distinct "celo_attestation"."completed_attestations"."account") AS "count"
FROM "celo_attestation"."completed_attestations"

-- Completed Attestation by issuer
SELECT "celo_attestation"."completed_attestations"."issuer" AS "issuer", count(*) AS "count"
FROM "celo_attestation"."completed_attestations"
GROUP BY "celo_attestation"."completed_attestations"."issuer"
ORDER BY "celo_attestation"."completed_attestations"."issuer" ASC

-- Completed attestation in last 7 days
SELECT count(distinct "celo_attestation"."completed_attestations"."pk") AS "count"
FROM "celo_attestation"."completed_attestations"
INNER JOIN "celo_attestation"."requested_attestations" "Requested Attestations"
ON "celo_attestation"."completed_attestations"."pk" = "Requested Attestations"."pk"
WHERE "celo_attestation"."completed_attestations"."block_timestamp" <= CAST((CAST(now() AS timestamp) + (INTERVAL '-7 day')) AS date)

-- Gas consumed per request
SELECT "celo_attestation"."requested_attestations"."identifier" AS "identifier",
       "celo_attestation"."requested_attestations"."account" AS "account",
       sum("celo_attestation"."requested_attestations"."gas_price") AS "sum"
FROM "celo_attestation"."requested_attestations"
LEFT JOIN "celo_attestation"."completed_attestations" "Completed Attestations"
ON "celo_attestation"."requested_attestations"."pk" = "Completed Attestations"."pk"
LEFT JOIN "celo_attestation"."issuer_selecteds" "Issuer Selecteds"
ON "celo_attestation"."requested_attestations"."pk" = "Issuer Selecteds"."pk"
WHERE ("celo_attestation"."requested_attestations"."block_timestamp" >= CAST((CAST(now() AS timestamp) + (INTERVAL '-1 day')) AS date)
   AND "celo_attestation"."requested_attestations"."block_timestamp" < CAST(now() AS date))
GROUP BY "celo_attestation"."requested_attestations"."identifier",
         "celo_attestation"."requested_attestations"."account"
ORDER BY "celo_attestation"."requested_attestations"."identifier" ASC,
         "celo_attestation"."requested_attestations"."account" ASC

-- Issuer selected for attestation
SELECT "celo_attestation"."issuer_selecteds"."issuer" AS "issuer", count(*) AS "count"
FROM "celo_attestation"."issuer_selecteds"
GROUP BY "celo_attestation"."issuer_selecteds"."issuer"
ORDER BY "celo_attestation"."issuer_selecteds"."issuer" ASC

-- Low success rate issuer
SELECT "source"."issuer" AS "issuer", "source"."Success Rate" AS "Success Rate"
FROM (SELECT "source"."issuer" AS "issuer",
      ((CAST("source"."count" AS float) / CASE WHEN "Question 1077"."count" = 0 THEN NULL ELSE "Question 1077"."count" END) * 100) AS "Success Rate"
      FROM (SELECT "celo_attestation"."completed_attestations"."issuer" AS "issuer", count(*) AS "count"
            FROM "celo_attestation"."completed_attestations"
            GROUP BY "celo_attestation"."completed_attestations"."issuer"
            ORDER BY "celo_attestation"."completed_attestations"."issuer" ASC) "source"
LEFT JOIN (
    SELECT "celo_attestation"."issuer_selecteds"."issuer" AS "issuer",
            count(*) AS "count"
    FROM "celo_attestation"."issuer_selecteds"
    GROUP BY "celo_attestation"."issuer_selecteds"."issuer") "Question 1077"
ON "source"."issuer" = "Question 1077"."issuer") "source"
ORDER BY "source"."Success Rate" ASC
LIMIT 10


-- Monthly attestation volume
SELECT date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) AS "day_timestamp",
       sum("celo_attestation"."attestation_day_data"."attestation_requested_count") AS "sum",
       sum("celo_attestation"."attestation_day_data"."attestation_completed_count") AS "sum_2",
       sum("celo_attestation"."attestation_day_data"."attestation_issuer_selected_count") AS "sum_3"
FROM "celo_attestation"."attestation_day_data"
GROUP BY date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp))
ORDER BY date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) DESC
LIMIT 10


-- Monthly gas consumed
SELECT date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) AS "day_timestamp",
       sum("celo_attestation"."attestation_day_data"."attestation_requested_gas_consumed") AS "sum",
       sum("celo_attestation"."attestation_day_data"."attestation_completed_gas_consumed") AS "sum_2",
       sum("celo_attestation"."attestation_day_data"."attestation_issuer_selected_gas_consumed") AS "sum_3"
FROM "celo_attestation"."attestation_day_data"
GROUP BY date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp))
ORDER BY date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) ASC


-- Monthly success/failure percentage
SELECT "source"."day_timestamp" AS "day_timestamp", "source"."sum" AS "sum", "source"."sum_2" AS "sum_2",
       "source"."Success Percentage" AS "Success Percentage", "source"."Failure Percentage" AS "Failure Percentage"
FROM (
    SELECT "source"."day_timestamp" AS "day_timestamp", "source"."sum" AS "sum", "source"."sum_2" AS "sum_2",
    ((CAST("source"."sum_2" AS float) / CASE WHEN "source"."sum" = 0 THEN NULL ELSE "source"."sum" END) * 100) AS "Success Percentage",
    ((CAST(("source"."sum" - "source"."sum_2") AS float) / CASE WHEN "source"."sum" = 0 THEN NULL ELSE "source"."sum" END) * 100) AS "Failure Percentage"
    FROM (
        SELECT date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) AS "day_timestamp",
               sum("celo_attestation"."attestation_day_data"."attestation_requested_count") AS "sum",
               sum("celo_attestation"."attestation_day_data"."attestation_completed_count") AS "sum_2"
        FROM "celo_attestation"."attestation_day_data"
        WHERE ("celo_attestation"."attestation_day_data"."day_timestamp" >= date_trunc('month', CAST((CAST(now() AS timestamp) + (INTERVAL '-10 month')) AS timestamp))
               AND "celo_attestation"."attestation_day_data"."day_timestamp" < date_trunc('month', CAST((CAST(now() AS timestamp) + (INTERVAL '1 month')) AS timestamp)))
        GROUP BY date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp))
        ORDER BY date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) ASC) "source") "source"
LIMIT 1048575


-- Monthly success rate trend
SELECT "source"."day_timestamp" AS "day_timestamp", "source"."Success Rate" AS "Success Rate"
FROM (
    SELECT "source"."day_timestamp" AS "day_timestamp",
           ((CAST("source"."sum" AS float) / CASE WHEN "source"."sum_2" = 0 THEN NULL ELSE "source"."sum_2" END) * 100) AS "Success Rate"
    FROM (
        SELECT date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) AS "day_timestamp",
               sum("celo_attestation"."attestation_day_data"."attestation_completed_count") AS "sum",
               sum("celo_attestation"."attestation_day_data"."attestation_requested_count") AS "sum_2"
        FROM "celo_attestation"."attestation_day_data"
        GROUP BY date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp))
        ORDER BY date_trunc('month', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) DESC) "source") "source"
WHERE ("source"."day_timestamp" >= date_trunc('month', CAST((CAST(now() AS timestamp) + (INTERVAL '-2 month')) AS timestamp))
   AND "source"."day_timestamp" < date_trunc('month', CAST(now() AS timestamp)))
LIMIT 1048575


-- Success percentage rate
SELECT sum("celo_attestation"."attestation_day_data"."attestation_completed_count") / sum("celo_attestation"."attestation_day_data"."attestation_requested_count") * 100 AS "percent"
FROM "celo_attestation"."attestation_day_data"


-- Quarterly attestation volume
SELECT date_trunc('quarter', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) AS "day_timestamp",
       sum("celo_attestation"."attestation_day_data"."attestation_requested_count") AS "sum",
       sum("celo_attestation"."attestation_day_data"."attestation_completed_count") AS "sum_2",
       sum("celo_attestation"."attestation_day_data"."attestation_issuer_selected_count") AS "sum_3"
FROM "celo_attestation"."attestation_day_data"
GROUP BY date_trunc('quarter', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp))
ORDER BY date_trunc('quarter', CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp)) ASC
LIMIT 10


-- Top 10 issuer
SELECT "source"."issuer" AS "issuer", "source"."Success Rate" AS "Success Rate"
FROM (
    SELECT "source"."issuer" AS "issuer",
           ((CAST("source"."count" AS float) / CASE WHEN "Question 1077"."count" = 0 THEN NULL ELSE "Question 1077"."count" END) * 100) AS "Success Rate"
    FROM (
        SELECT "celo_attestation"."completed_attestations"."issuer" AS "issuer", count(*) AS "count"
        FROM "celo_attestation"."completed_attestations"
        GROUP BY "celo_attestation"."completed_attestations"."issuer"
        ORDER BY "celo_attestation"."completed_attestations"."issuer" ASC) "source"
LEFT JOIN (
    SELECT "celo_attestation"."issuer_selecteds"."issuer" AS "issuer", count(*) AS "count"
    FROM "celo_attestation"."issuer_selecteds" GROUP BY "celo_attestation"."issuer_selecteds"."issuer") "Question 1077"
ON "source"."issuer" = "Question 1077"."issuer") "source"
ORDER BY "source"."Success Rate" DESC
LIMIT 10


-- Weekly attestation volume
SELECT (CAST(date_trunc('week', CAST((CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) AS "day_timestamp",
       sum("celo_attestation"."attestation_day_data"."attestation_requested_count") AS "sum",
       sum("celo_attestation"."attestation_day_data"."attestation_completed_count") AS "sum_2",
       sum("celo_attestation"."attestation_day_data"."attestation_issuer_selected_count") AS "sum_3"
FROM "celo_attestation"."attestation_day_data"
GROUP BY (CAST(date_trunc('week', CAST((CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
ORDER BY (CAST(date_trunc('week', CAST((CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) DESC
LIMIT 15


-- Weekly gas consumed
SELECT (CAST(date_trunc('week', CAST((CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) AS "day_timestamp",
       sum("celo_attestation"."attestation_day_data"."attestation_requested_gas_consumed") AS "sum",
       sum("celo_attestation"."attestation_day_data"."attestation_completed_gas_consumed") AS "sum_2",
       sum("celo_attestation"."attestation_day_data"."attestation_issuer_selected_gas_consumed") AS "sum_3"
FROM "celo_attestation"."attestation_day_data"
WHERE ("celo_attestation"."attestation_day_data"."day_timestamp" >= (CAST(date_trunc('week', CAST((CAST((CAST(now() AS timestamp) + (INTERVAL '-12 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
   AND "celo_attestation"."attestation_day_data"."day_timestamp" < (CAST(date_trunc('week', CAST((CAST((CAST(now() AS timestamp) + (INTERVAL '1 week')) AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')))
GROUP BY (CAST(date_trunc('week', CAST((CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
ORDER BY (CAST(date_trunc('week', CAST((CAST("celo_attestation"."attestation_day_data"."day_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) ASC
LIMIT 15

