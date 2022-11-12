-- Accounts with successful attestation
SELECT count(distinct "celo_attestation"."completed_attestations"."account") AS "count"
FROM "celo_attestation"."completed_attestations"
WHERE "celo_attestation"."completed_attestations"."identifier" = {{identifier}}


-- Attestation requests for identifier
SELECT count(*) AS "count"
FROM "celo_attestation"."requested_attestations"
WHERE "celo_attestation"."requested_attestations"."identifier" = {{identifier}}
GROUP BY "celo_attestation"."requested_attestations"."identifier"
ORDER BY "celo_attestation"."requested_attestations"."identifier" ASC


-- Attestation request for particular account
SELECT count(distinct "celo_attestation"."requested_attestations"."account") AS "count"
FROM "celo_attestation"."requested_attestations"
WHERE "celo_attestation"."requested_attestations"."identifier" = {{identifier}}


-- Request count by identifier
SELECT "source"."identifier" AS "identifier", "source"."block_timestamp" AS "block_timestamp", "source"."count" AS "count"
FROM (
    SELECT "celo_attestation"."requested_attestations"."identifier" AS "identifier",
           (CAST(date_trunc('week', CAST((CAST("celo_attestation"."requested_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) AS "block_timestamp",
           count(*) AS "count"
    FROM "celo_attestation"."requested_attestations"
GROUP BY "celo_attestation"."requested_attestations"."identifier",
         (CAST(date_trunc('week', CAST((CAST("celo_attestation"."requested_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day'))
ORDER BY "celo_attestation"."requested_attestations"."identifier" ASC,
         (CAST(date_trunc('week', CAST((CAST("celo_attestation"."requested_attestations"."block_timestamp" AS timestamp) + (INTERVAL '1 day')) AS timestamp)) AS timestamp) + (INTERVAL '-1 day')) ASC) "source"
WHERE "source"."identifier" = {{identifier}}
LIMIT 1048575


-- Successful attestation for an identifier
SELECT "celo_attestation"."completed_attestations"."identifier" AS "identifier", count(*) AS "count"
FROM "celo_attestation"."completed_attestations"
WHERE "celo_attestation"."completed_attestations"."identifier" = {{identifier}}
GROUP BY "celo_attestation"."completed_attestations"."identifier"
ORDER BY "celo_attestation"."completed_attestations"."identifier" ASC


-- Top attestation request by identifier
SELECT "celo_attestation"."requested_attestations"."identifier" AS "identifier", count(*) AS "count"
FROM "celo_attestation"."requested_attestations"
GROUP BY "celo_attestation"."requested_attestations"."identifier"
ORDER BY "count" DESC, "celo_attestation"."requested_attestations"."identifier" ASC
LIMIT 10

