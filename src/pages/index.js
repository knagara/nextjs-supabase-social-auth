import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export default function Home() {
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
          <div></div>
        </div>
      </main>
    </>
  );
}
