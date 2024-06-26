"use client";

import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useEffect, useMemo, useState } from "react";
import { createViewerToken } from "./actions";
import { LiveKitRoom } from "@livekit/components-react";
import StreamPlayer from "./stream-player";

export default function WatchChannel({ slug }: { slug: string }) {
  const [viewerToken, setViewerToken] = useState("");
  const [viewerName, setViewerName] = useState("");

  // const fakeName = useMemo(() => faker.person.fullName(), []);
  const fakeName = "tesst";

  // NOTE: This is a hack to persist the viewer token in the session storage
  // so that the client doesn't have to create a viewer token every time they
  // navigate back to the page.
  useEffect(() => {
    const getOrCreateViewerToken = async () => {
      const SESSION_VIEWER_TOKEN_KEY = `${slug}-viewer-token`;
      const sessionToken = sessionStorage.getItem(SESSION_VIEWER_TOKEN_KEY);

      if (sessionToken) {
        const payload: JwtPayload = jwtDecode(sessionToken);

        if (payload.exp) {
          const expiry = new Date(payload.exp * 1000);
          if (expiry < new Date()) {
            sessionStorage.removeItem(SESSION_VIEWER_TOKEN_KEY);
            const token = await createViewerToken(slug, fakeName);
            setViewerToken(token);
            const jti = jwtDecode(token)?.jti;
            jti && setViewerName(jti);
            sessionStorage.setItem(SESSION_VIEWER_TOKEN_KEY, token);
            return;
          }
        }

        if (payload.jti) {
          setViewerName(payload.jti);
        }

        setViewerToken(sessionToken);
      } else {
        const token = await createViewerToken(slug, fakeName);
        setViewerToken(token);
        const jti = jwtDecode(token)?.jti;
        jti && setViewerName(jti);
        sessionStorage.setItem(SESSION_VIEWER_TOKEN_KEY, token);
      }
    };
    void getOrCreateViewerToken();
  }, [fakeName, slug]);

  // if (viewerToken === "" || viewerName === "") {
  //   return null;
  // }

  return (
    <LiveKitRoom
      token={viewerToken}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
      className="flex flex-1 flex-col h-100"
    >
      {/* <WatchingAsBar viewerName={viewerName} /> */}
      <div className="flex h-100 flex-1">
        <div className="flex-1 flex-col container h-100">
          <StreamPlayer streamerIdentity={slug} />
          {/* <ChannelInfo streamerIdentity={slug} viewerIdentity={viewerName} /> */}
        </div>
        {/* <div className="sticky hidden w-80 border-l md:block">
          <div className="absolute top-0 bottom-0 right-0 flex h-full w-full flex-col gap-2 p-2">
            <Chat participantName={viewerName} />
          </div>
        </div> */}
      </div>
      
    </LiveKitRoom>

  );
}
