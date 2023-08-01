import { WalletSimple } from '../../providers';

interface WalletFilterSDKProps {
  wallets: WalletSimple[];
  onSelectWallet?: (wallet: WalletSimple) => void;
  className?: string;
}

export const WalletFilterSDK = ({
  wallets,
  onSelectWallet,
  className = '',
}: WalletFilterSDKProps) => {
  return (
    <div
      className={`pw-bg-white pw-rounded-[14px] pw-px-[18px] pw-py-[14px] pw-shadow pw-flex pw-items-center pw-gap-2 ${className}`}
    >
      {wallets.map((wallet) => (
        <button
          className="pw-text-center pw-text-slate-700 pw-text-xs pw-font-medium pw-px-6 pw-py-[5px] pw-bg-neutral-100 pw-rounded-full pw-border pw-border-neutral-200 pw-flex pw-justify-center pw-items-center"
          key={wallet.address}
          onClick={() => onSelectWallet?.(wallet)}
        >
          {wallet.type}
        </button>
      ))}
    </div>
  );
};