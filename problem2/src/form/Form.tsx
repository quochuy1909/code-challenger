import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/modeToggle";
import { useCurrency } from "@/hooks/useCurrency";
import { useToast } from "@/components/ui/use-toast";
import { useMemo, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const SwapForm = () => {
  const { toast } = useToast();
  const { currencies } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const formSchema = z.object({
    amountToSend: z.string().min(1, {
      message: "Please input your amount to send.",
    }),
    amountToReceive: z.optional(z.string()),
    fromCurrency: z.string(),
    toCurrency: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { isValid } = form.formState;

  const watch = form.watch(["amountToSend", "fromCurrency", "toCurrency"]);
  // const amountToSend = watch()
  // const fromCurrency = UseFormWatch({ control, name: "fromCurrency" });
  // const toCurrency = UseFormWatch({ control, name: "toCurrency" });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { fromCurrency, toCurrency, amountToSend, amountToReceive } = values;
    if (!fromCurrency || !toCurrency || !amountToSend || !amountToReceive)
      return;
    if (fromCurrency === toCurrency) {
      toast({
        title: "Error",
        description: "Please select different currencies",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Swap successfully",
      });
      setLoading(false);
    }, 2000);
  }

  useMemo(() => {
    const [amountToSend, fromCurrency, toCurrency] = watch;
    if (amountToSend && fromCurrency && toCurrency) {
      const fromRate = currencies?.find(
        (cur) => cur.currency === fromCurrency
      )?.price;
      const toRate = currencies?.find(
        (cur) => cur.currency === toCurrency
      )?.price;
      if (!fromRate || !toRate) return;
      const amountToReceive = (+amountToSend * fromRate) / toRate;
      if (!amountToReceive) return;
      form.setValue(
        "amountToReceive",
        Number(amountToReceive).toFixed(2).toString()
      );
    }
  }, [watch]);

  useMemo(() => {
    if (isValid) setDisabled(false);
    else setDisabled(true);
  }, [isValid]);

  return (
    <div className="w-1/2 mx-auto py-4">
      <div className="flex justify-end">
        <ModeToggle />
      </div>
      <h1 className="text-2xl font-bold">Swap</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-between gap-4 mt-8">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="fromCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies &&
                          currencies.map((currency, index) => (
                            <SelectItem key={index} value={currency.currency}>
                              <div className="flex items-center gap-2">
                                <img
                                  className="w-8 h-8"
                                  src={currency?.image}
                                />{" "}
                                {currency.currency}
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your currency</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="toCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies &&
                          currencies.map((currency, index) => (
                            <SelectItem key={index} value={currency.currency}>
                              <div className="flex items-center gap-2">
                                <img
                                  className="w-8 h-8"
                                  src={currency?.image}
                                />{" "}
                                {currency.currency}
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your currency</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="amountToSend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount to send</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amount to send"
                        {...field}
                        type="number"
                        min={0}
                        step={0.00001}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription>
                      Please input your amount to send.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="amountToReceive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount to receive</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Amount to receive"
                        {...field}
                        type="number"
                        min={0}
                        step={0.00001}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your amount to receive.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Button type="submit" disabled={disabled || loading}>
              {loading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  CONFIRM SWAP
                </>
              ) : (
                "CONFIRM SWAP"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default SwapForm;
