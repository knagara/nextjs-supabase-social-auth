import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export default function Home() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [testData, setTestData] = useState("");

  // Supabaseのtestテーブルに入っているテストデータを1つ取得
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

  return (
    <>
      <main>
        <div>
          <h2>Supabaseのtestテーブルに入っているテストデータを1つ取得</h2>
          <p>{testData}</p>
        </div>
        <div>
          <h2>SupabaseによるGoogleログイン</h2>
          <div>
            {user ? (
              <></>
            ) : (
              <div>
                <p>ログインしていません</p>
                <div style={{ width: "400px", margin: "64px auto" }}>
                  <Auth
                    redirectTo={process.env.NEXT_PUBLIC_SITE_URL}
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
