import { getPriority } from "./utils/piority";
// Should import getPriority from another file and use it when needed.
// Because when component re-rendered, getPriority will be created again.

interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return lhsPriority > -99 && balance.amount <= 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        getPriority(lhs.blockchain) > getPriority(rhs.blockchain) ? -1 : 1;
        // Can replaced by ES6 ternary operator for code clean.
      })
      .map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
        };
      });
  }, [balances, prices]);

  // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  //   return {
  //     ...balance,
  //     formatted: balance.amount.toFixed()
  //   }
  // })

  // use formattedBalances in useMemo to avoid re-rendered

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = useMemo(
        () => prices[balance.currency] * balance.amount,
        [prices, balance]
      );
      //   use usdValue in useMemo to memoize the calculation.
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
