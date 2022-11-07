using System.Net.Http.Json;

using Microsoft.Extensions.Options;
using Nomis.Celoscan.Interfaces;
using Nomis.Celoscan.Interfaces.Models;
using Nomis.Celoscan.Interfaces.Settings;
using Nomis.Utils.Exceptions;

namespace Nomis.Celoscan
{
    /// <inheritdoc cref="ICeloscanClient"/>
    internal sealed class CeloscanClient :
        ICeloscanClient
    {
        private readonly CeloscanSettings _celoscanSettings;
        private const int ItemsFetchLimit = 10000;

        private readonly HttpClient _client;

        /// <summary>
        /// Initialize <see cref="CeloscanClient"/>.
        /// </summary>
        /// <param name="celoscanSettings"><see cref="CeloscanSettings"/>.</param>
        public CeloscanClient(
            IOptions<CeloscanSettings> celoscanSettings)
        {
            _celoscanSettings = celoscanSettings.Value;
            _client = new()
            {
                BaseAddress = new(celoscanSettings.Value.ApiBaseUrl ??
                                  throw new ArgumentNullException(nameof(celoscanSettings.Value.ApiBaseUrl)))
            };
        }

        /// <inheritdoc/>
        public async Task<CeloscanAccount> GetBalanceAsync(string address)
        {
            var request =
                $"/api?module=account&action=balance&address={address}&tag=latest";
            if (!string.IsNullOrWhiteSpace(_celoscanSettings.ApiKey))
            {
                request += $"&apiKey={_celoscanSettings.ApiKey}";
            }

            var response = await _client.GetAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<CeloscanAccount>() ?? throw new CustomException("Can't get account balance.");
        }

        /// <inheritdoc/>
        public async Task<IEnumerable<TResultItem>> GetTransactionsAsync<TResult, TResultItem>(string address)
            where TResult : ICeloscanTransferList<TResultItem>
            where TResultItem : ICeloscanTransfer
        {
            var result = new List<TResultItem>();
            var transactionsData = await GetTransactionList<TResult>(address);
            result.AddRange(transactionsData.Data ?? new List<TResultItem>());
            while (transactionsData?.Data?.Count >= ItemsFetchLimit)
            {
                transactionsData = await GetTransactionList<TResult>(address, transactionsData.Data.LastOrDefault()?.BlockNumber);
                result.AddRange(transactionsData?.Data ?? new List<TResultItem>());
            }

            return result;
        }

        private async Task<TResult> GetTransactionList<TResult>(
            string address,
            string? startBlock = null)
        {
            var request =
                $"/api?module=account&address={address}&sort=asc";

            if (typeof(TResult) == typeof(CeloscanAccountNormalTransactions))
            {
                request = $"{request}&action=txlist";
            }
            else if (typeof(TResult) == typeof(CeloscanAccountInternalTransactions))
            {
                request = $"{request}&action=txlistinternal";
            }
            else if (typeof(TResult) == typeof(CeloscanAccountERC20TokenEvents))
            {
                request = $"{request}&action=tokentx";
            }
            else if (typeof(TResult) == typeof(CeloscanAccountERC721TokenEvents))
            {
                request = $"{request}&action=tokennfttx";
            }
            else
            {
                return default!;
            }

            if (!string.IsNullOrWhiteSpace(startBlock))
            {
                request = $"{request}&startblock={startBlock}";
            }
            else
            {
                request = $"{request}&startblock=0";
            }

            request = $"{request}&endblock=999999999";

            if (!string.IsNullOrWhiteSpace(_celoscanSettings.ApiKey))
            {
                request += $"&apiKey={_celoscanSettings.ApiKey}";
            }

            var response = await _client.GetAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<TResult>() ?? throw new CustomException("Can't get account transactions.");
        }
    }
}