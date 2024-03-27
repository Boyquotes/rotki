import { Blockchain } from '@rotki/common/lib/blockchain';
import { isBlockchain } from '@/types/blockchain/chains';
import type { MaybeRef } from '@vueuse/core';
import type {
  ChainInfo,
  EvmChainEntries,
  EvmChainInfo,
  SubstrateChainInfo,
  SupportedChains,
} from '@/types/api/chains';

function isEvmChain(info: ChainInfo): info is EvmChainInfo {
  return info.type === 'evm';
}

function isSubstrateChain(info: ChainInfo): info is SubstrateChainInfo {
  return info.type === 'substrate';
}

export const useSupportedChains = createSharedComposable(() => {
  const { fetchSupportedChains, fetchAllEvmChains } = useSupportedChainsApi();

  const { connected } = toRefs(useMainStore());

  const supportedChains = asyncComputed<SupportedChains>(() => {
    if (get(connected))
      return fetchSupportedChains();

    return [];
  }, []);

  const allEvmChains = asyncComputed<EvmChainEntries>(() => {
    if (get(connected))
      return fetchAllEvmChains();

    return [];
  }, []);

  const evmChainsData: ComputedRef<EvmChainInfo[]> = computed(() =>
    // isEvmChain guard does not work the same with useArrayFilter
    get(supportedChains).filter(isEvmChain),
  );

  const substrateChainsData: ComputedRef<SubstrateChainInfo[]> = computed(() =>
    get(supportedChains).filter(isSubstrateChain),
  );

  const txEvmChains: ComputedRef<EvmChainInfo[]> = useArrayFilter(
    evmChainsData,
    x => x.id !== Blockchain.AVAX,
  );

  const evmChains: ComputedRef<string[]> = useArrayMap(
    evmChainsData,
    x => x.id,
  );

  const evmChainNames: ComputedRef<string[]> = useArrayMap(
    evmChainsData,
    x => x.evmChainName,
  );

  const isEvm = (chain: MaybeRef<string>) =>
    useArrayInclude(evmChains, chain);

  const supportsTransactions = (chain: MaybeRef<string>): boolean => {
    const chains = get(txEvmChains);
    const selectedChain = get(chain);
    return chains.some(x => x.id === selectedChain);
  };

  const getEvmChainName = (chain: string): string | null =>
    get(evmChainsData).find(x => x.id === chain)?.evmChainName || null;

  const getChainInfoByName = (chain: MaybeRef<string>): ComputedRef<ChainInfo | null> =>
    computed(() => get(supportedChains).find(({ name }) => name.toLowerCase() === get(chain).toLowerCase()) || null);

  const getChainInfoById = (
    chain: MaybeRef<string>,
  ): ComputedRef<ChainInfo | null> =>
    computed(() => get(supportedChains).find(x => x.id === get(chain)) || null);

  const getChainName = (chain: MaybeRef<string>): ComputedRef<string> =>
    computed(() => {
      const chainVal = get(chain);
      return get(getChainInfoById(chainVal))?.name || chainVal;
    });

  const getNativeAsset = (chain: MaybeRef<string>) => {
    const blockchain = get(chain);
    return (
      [...get(evmChainsData), ...get(substrateChainsData)].find(
        ({ id }) => id === blockchain,
      )?.nativeToken || blockchain
    );
  };

  const getChain = (evmChain: string, defaultValue: any = Blockchain.ETH): Blockchain => {
    // note: we're using toSnakeCase here to always ensure that chains
    // with combined names gets parsed to match their chain name
    const chainData = get(txEvmChains).find(
      ({ evmChainName }) => evmChainName === toSnakeCase(evmChain),
    );
    if (chainData && isBlockchain(chainData.id))
      return chainData.id;

    return defaultValue;
  };

  const getChainImageUrl = (chain: MaybeRef<string>) => computed<string>(() => {
    const chainVal = get(chain);
    const image = get(getChainInfoById(chainVal))?.image || `${chainVal}.svg`;

    return `./assets/images/protocols/${image}`;
  });

  const txEvmChainsToLocation = computed(() =>
    get(txEvmChains).map(item => toHumanReadable(item.evmChainName)),
  );

  return {
    allEvmChains,
    supportedChains,
    evmChains,
    evmChainsData,
    evmChainNames,
    txEvmChains,
    getNativeAsset,
    getEvmChainName,
    getChain,
    getChainInfoById,
    getChainInfoByName,
    getChainName,
    getChainImageUrl,
    isEvm,
    supportsTransactions,
    txEvmChainsToLocation,
  };
});
