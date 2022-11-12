-- Completed attestation by issuer
SELECT "source"."issuer" AS "issuer", "source"."count" AS "count"
FROM (SELECT "celo_attestation"."completed_attestations"."issuer" AS "issuer", count(*) AS "count" FROM "celo_attestation"."completed_attestations"
GROUP BY "celo_attestation"."completed_attestations"."issuer"
ORDER BY "celo_attestation"."completed_attestations"."issuer" ASC) "source"
WHERE "source"."issuer" = {{issuer}}
LIMIT 1048575


-- Issuer selected for attestation attestation
SELECT "celo_attestation"."issuer_selecteds"."issuer" AS "issuer", count(*) AS "count"
FROM "celo_attestation"."issuer_selecteds"
WHERE "celo_attestation"."issuer_selecteds"."issuer" = {{issuer}}
GROUP BY "celo_attestation"."issuer_selecteds"."issuer"
ORDER BY "celo_attestation"."issuer_selecteds"."issuer" ASC


-- Issuer success rate
SELECT "source"."Success Rate" AS "Success Rate"
FROM (SELECT "source"."issuer" AS "issuer", "source"."count" AS "count", ((CAST("source"."count" AS float) / CASE WHEN "Question 1079"."count" = 0 THEN NULL ELSE "Question 1079"."count" END) * 100) AS "Success Rate", "Question 1079"."issuer" AS "Question 1079__issuer", "Question 1079"."count" AS "count_2" FROM (SELECT "celo_attestation"."completed_attestations"."issuer" AS "issuer", count(*) AS "count" FROM "celo_attestation"."completed_attestations"
GROUP BY "celo_attestation"."completed_attestations"."issuer"
ORDER BY "celo_attestation"."completed_attestations"."issuer" ASC) "source"
LEFT JOIN (SELECT "celo_attestation"."issuer_selecteds"."issuer" AS "issuer", count(*) AS "count" FROM "celo_attestation"."issuer_selecteds" GROUP BY "celo_attestation"."issuer_selecteds"."issuer") "Question 1079" ON "source"."issuer" = "Question 1079"."issuer") "source"
[[WHERE "source"."issuer" = {{issuer}}]]
LIMIT 1048575


-- Monthly success rate of issuer
SELECT date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) AS "block_timestamp", avg("source"."Success Rate") AS "avg"
FROM (
    SELECT "source"."issuer" AS "issuer", "source"."block_timestamp" AS "block_timestamp",
           ((CAST(coalesce("Question 1084"."count", 0) AS float) / CASE WHEN "source"."count" = 0 THEN NULL ELSE "source"."count" END) * 100) AS "Success Rate"
    FROM (
        SELECT "celo_attestation"."issuer_selecteds"."issuer" AS "issuer",
               date_trunc('month', CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp)) AS "block_timestamp",
               count(*) AS "count"
        FROM "celo_attestation"."issuer_selecteds"
        GROUP BY "celo_attestation"."issuer_selecteds"."issuer",
                 date_trunc('month', CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp))
        ORDER BY "celo_attestation"."issuer_selecteds"."issuer" ASC,
                 date_trunc('month', CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp)) ASC) "source"
    LEFT JOIN (
        SELECT "celo_attestation"."completed_attestations"."issuer" AS "issuer",
               (CAST(date_trunc('week', CAST((CAST("celo_attestation"."completed_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) AS "block_timestamp",
               count(*) AS "count"
        FROM "celo_attestation"."completed_attestations"
        GROUP BY "celo_attestation"."completed_attestations"."issuer",
                 (CAST(date_trunc('week', CAST((CAST("celo_attestation"."completed_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))) "Question 1084"
    ON ("source"."issuer" = "Question 1084"."issuer"
       AND date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) = date_trunc('month', CAST("Question 1084"."block_timestamp" AS timestamp)))
       ) "source"
WHERE "source"."issuer" = {{issuer}}
GROUP BY date_trunc('month', CAST("source"."block_timestamp" AS timestamp))
ORDER BY date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) ASC


-- Monthly success trend
SELECT date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) AS "block_timestamp", avg("source"."Success Rate") AS "Success Rate"
FROM (
    SELECT "source"."issuer" AS "issuer", "source"."block_timestamp" AS "block_timestamp",
           ((CAST(coalesce("Question 1084"."count", 0) AS float) / CASE WHEN "source"."count" = 0 THEN NULL ELSE "source"."count" END) * 100) AS "Success Rate"
    FROM (
        SELECT "celo_attestation"."issuer_selecteds"."issuer" AS "issuer",
               date_trunc('month', CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp)) AS "block_timestamp",
               count(*) AS "count"
        FROM "celo_attestation"."issuer_selecteds"
        GROUP BY "celo_attestation"."issuer_selecteds"."issuer",
                 date_trunc('month', CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp))
        ORDER BY "celo_attestation"."issuer_selecteds"."issuer" ASC,
                 date_trunc('month', CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp)) ASC) "source"
LEFT JOIN (
    SELECT "celo_attestation"."completed_attestations"."issuer" AS "issuer",
           (CAST(date_trunc('week', CAST((CAST("celo_attestation"."completed_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) AS "block_timestamp",
           count(*) AS "count"
    FROM "celo_attestation"."completed_attestations"
    GROUP BY "celo_attestation"."completed_attestations"."issuer",
             (CAST(date_trunc('week', CAST((CAST("celo_attestation"."completed_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))) "Question 1084"
ON ("source"."issuer" = "Question 1084"."issuer"
   AND date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) = date_trunc('month', CAST("Question 1084"."block_timestamp" AS timestamp)))) "source"
WHERE "source"."issuer" = {{issuer}} GROUP BY date_trunc('month', CAST("source"."block_timestamp" AS timestamp))
ORDER BY date_trunc('month', CAST("source"."block_timestamp" AS timestamp)) DESC
LIMIT 2


-- Weekly Issuer success rate
SELECT "source"."issuer" AS "issuer", "source"."block_timestamp" AS "block_timestamp", "source"."count" AS "count",
       "source"."Success Rate" AS "Success Rate", "source"."Question 1082__issuer" AS "Question 1082__issuer",
       "source"."Question 1082__block_timestamp" AS "Question 1082__block_timestamp", "source"."count" AS "count_2"
FROM (
    SELECT "source"."issuer" AS "issuer", "source"."block_timestamp" AS "block_timestamp", "source"."count" AS "count",
           ((CAST(coalesce("Question 1082"."count", 0) AS float) / CASE WHEN "source"."count" = 0 THEN NULL ELSE "source"."count" END) * 100) AS "Success Rate",
           "Question 1082"."issuer" AS "Question 1082__issuer", "Question 1082"."block_timestamp" AS "Question 1082__block_timestamp",
           "Question 1082"."count" AS "count_2"
    FROM (
        SELECT "celo_attestation"."issuer_selecteds"."issuer" AS "issuer",
               (CAST(date_trunc('week', CAST((CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) AS "block_timestamp",
               count(*) AS "count"
        FROM "celo_attestation"."issuer_selecteds"
        GROUP BY "celo_attestation"."issuer_selecteds"."issuer",
                 (CAST(date_trunc('week', CAST((CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
        ORDER BY "celo_attestation"."issuer_selecteds"."issuer" ASC,
                 (CAST(date_trunc('week', CAST((CAST("celo_attestation"."issuer_selecteds"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) ASC) "source"
LEFT JOIN (
    SELECT "celo_attestation"."completed_attestations"."issuer" AS "issuer",
           (CAST(date_trunc('week', CAST((CAST("celo_attestation"."completed_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) AS "block_timestamp",
           count(*) AS "count"
    FROM "celo_attestation"."completed_attestations"
    GROUP BY "celo_attestation"."completed_attestations"."issuer",
             (CAST(date_trunc('week', CAST((CAST("celo_attestation"."completed_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))) "Question 1082"
ON ("source"."issuer" = "Question 1082"."issuer"
   AND (CAST(date_trunc('week', CAST((CAST("source"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) = (CAST(date_trunc('week', CAST((CAST("Question 1082"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')))) "source"
WHERE "source"."issuer" = {{issuer}}
LIMIT 1048575

