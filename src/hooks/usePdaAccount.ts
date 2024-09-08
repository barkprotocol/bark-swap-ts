import { PublicKey } from "@solana/web3.js";
import { getProtocolProgramId } from "@/lib/constants";
import { useEnv } from "@/components/layout/EnvProvider";
import { useMemo } from "react";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";

export function usePdaAccount(): [PublicKey | null, number | null] {
  const { publicKey } = useUnifiedWallet();
  const envValues = useEnv();

  const pdaAccount = useMemo(() => {
    if (!publicKey) return [null, null];

    try {
      // Derive the PDA and bump seed
      const programId = getProtocolProgramId(envValues);
      const [pda, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("orders"), publicKey.toBuffer()],
        programId
      );
      return [pda, bump];
    } catch (error) {
      console.error("Failed to derive PDA:", error);
      return [null, null];
    }
  }, [envValues, publicKey]);

  return pdaAccount;
}
