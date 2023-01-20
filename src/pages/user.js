import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import NextLink from "next/link";

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  return (
    <>
      <main>
        <div>
          <h2>【ユーザ情報取得】</h2>
          <div>
            {user ? (
              <div>
                <p>ログインしています</p>
                <button onClick={() => supabaseClient.auth.signOut()}>
                  ログアウト
                </button>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </div>
            ) : (
              <div>
                <p>ログインしていません</p>
              </div>
            )}
          </div>
          <div style={{ margin: "32px 0" }}>
            <p>
              <NextLink href="/">トップに戻る</NextLink>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
