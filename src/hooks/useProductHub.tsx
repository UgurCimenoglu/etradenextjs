import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useProductHub() {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(
        `${process.env.NEXT_PUBLIC_HUB_BASE_URL}${process.env.NEXT_PUBLIC_PRODUCTS_HUB}`
      )
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on(
            `${process.env.NEXT_PUBLIC_RECIEVE_PRODUCT_FUNCTION}`,
            (message) => {
              toast.info(message);
            }
          );
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);
}
