from typing import Final

VALIDATOR_STATS_QUERY_BACKOFF_EVERY_N_VALIDATORS = 30
VALIDATOR_STATS_QUERY_BACKOFF_TIME_RANGE = 20
VALIDATOR_STATS_QUERY_BACKOFF_TIME = 8

LAST_PRODUCED_BLOCKS_QUERY_TS: Final = 'last_produced_blocks_query_ts'
LAST_WITHDRAWALS_EXIT_QUERY_TS: Final = 'last_withdrawals_exit_query_ts'
WITHDRAWALS_TS_PREFIX: Final = 'ethwithdrawalsts'
WITHDRAWALS_IDX_PREFIX: Final = 'ethwithdrawalsidx'

FREE_VALIDATORS_LIMIT = 4
UNKNOWN_VALIDATOR_INDEX = -1

CPT_ETH2: Final = 'eth2'
