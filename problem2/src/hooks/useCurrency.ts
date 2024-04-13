import { useEffect, useState } from "react";
import CurrencyJson from "@/data/currency.json";

export interface ICurrency {
  currency: string;
  date: string;
  price: number;
  image?: string;
}
export const useCurrency = () => {
  const [currencies, setCurrencies] = useState<ICurrency[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = CurrencyJson;
        if (!result) return;
        const currencyNameArray: string[] = [];
        const currencyArray: ICurrency[] = [];
        for (let i = 0; i < result.length; i++) {
          //   result[i].date = new Date(result[i].date).toISOString();
          if (!currencyNameArray.includes(result[i].currency)) {
            currencyNameArray.push(result[i].currency);
            currencyArray.push(result[i]);
          } else {
            const getCurrencyPrice =
              currencyArray.find((cur) => cur.currency === result[i].currency)
                ?.price ?? 0;

            if (result[i].price > (getCurrencyPrice && getCurrencyPrice)) {
              const index = currencyArray.findIndex(
                (x) => x.currency === result[i].currency
              );
              currencyArray[index] = result[i];
            }
          }
        }
        setCurrencies(currencyArray);
      } catch (err) {
        console.log("Can not get currency list ", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { currencies, loading };
};
