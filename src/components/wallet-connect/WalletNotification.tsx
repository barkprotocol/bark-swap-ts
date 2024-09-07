import type {
  IUnifiedWalletConfig,
  IWalletNotification,
} from "@jup-ag/wallet-adapter/dist/types/contexts/WalletConnectionProvider";

import { notifications } from "@mantine/notifications";

const classNames = {
  icon: "box-content p-1",
};

const WalletNotification: IUnifiedWalletConfig["notificationCallback"] = {
  onConnect: (props: IWalletNotification) => {
    notifications.show({
      title: "Wallet Connected",
      message: `Connected to wallet ${props.shortAddress}`,
      color: "green",
      icon: <span className="material-symbols-rounded">link</span>,
      classNames,
    });
  },
  onConnecting: () => {
    return;
  },
  onDisconnect: (props: IWalletNotification) => {
    notifications.show({
      title: `Disconnected from ${props.walletName}`,
      message: `Disconnected from wallet ${props.shortAddress}`,
      color: "orange",
      icon: <span className="material-symbols-rounded">link_off</span>,
      classNames,
    });
  },
  onNotInstalled: (props: IWalletNotification) => {
    notifications.show({
      title: `${props.walletName} Wallet is not installed`,
      message: (
        <span>
          {`Please go to the provider`}{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            tw="underline font-bold"
            href={props.metadata.url}
          >
            {`website`}
          </a>{" "}
          {`to download.`}
        </span>
      ),
      classNames,
    });
  },
};

export default WalletNotification;
