import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [testData, setTestData] = useState("");

  // 【Supabase接続テスト】testテーブルに入っているテストデータを1つ取得
  async function fetchTestData() {
    let { data, error } = await supabase
      .from("test")
      .select("*")
      .limit(1)
      .single();
    setTestData(data.text);
  }

  useEffect(() => {
    fetchTestData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <main>
        <div>
          <h2>
            【Supabase接続テスト】testテーブルに入っているテストデータを1つ取得
          </h2>
          <div style={{ margin: "16px 0 32px" }}>
            <p>{testData}</p>
          </div>
        </div>
        <div>
          <h2>【SupabaseによるGoogleログイン】</h2>
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
                <div style={{ width: "400px", margin: "64px auto" }}>
                  <Auth
                    redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}`}
                    appearance={{ theme: ThemeSupa }}
                    supabaseClient={supabaseClient}
                    providers={["google"]}
                    socialLayout="horizontal"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
