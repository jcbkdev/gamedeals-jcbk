import { platform } from "../../components/gameCard/gameCard";
import urlBase64ToUint8Array from "../../components/utils/urlBase64ToUint8Array";

const public_key =
  "BGs-rU2u_wS63oQ7IkK0naLsYO6yCDwvNba1QF1HsoxXm08vsiTtUn3PDytpkSJW91a9fL8pIG5WEdqHTb-m1Jk";

function isServiceWorker(): boolean {
  return "serviceWorker" in navigator;
}

async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  const register = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
  });

  //update
  register.update();

  return register;
}

async function registerPush(
  register: ServiceWorkerRegistration
): Promise<PushSubscription> {
  const push = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(public_key),
  });

  return push;
}

async function sendPush(push: PushSubscription, tags: platform[] | "all") {
  await fetch("http://localhost:80/api/post/subscribe", {
    method: "POST",
    body: JSON.stringify(push),
    headers: {
      "content-type": "application/json",
      "game-tags": JSON.stringify(tags),
    },
  });
}

export async function subscribe(tags: platform[] | "all") {
  if (!isServiceWorker())
    return alert("Your browser doesn't support service workers");

  registerServiceWorker().then((register) =>
    registerPush(register).then((push) => sendPush(push, tags))
  );
}
