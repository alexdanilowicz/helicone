import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import useNotification from "../components/shared/notification/useNotification";
import AuthForm from "../components/templates/auth/authForm";
import { GetServerSidePropsContext } from "next";
import { isCustomerDomain } from "../lib/customerPortalHelpers";
import { supabaseServer } from "../lib/supabaseServer";
import { Result, err, ok } from "../lib/result";
import { SupabaseServerWrapper } from "../lib/wrappers/supabase";

export type CustomerPortalContent = {
  domain: string;
  logo: string;
};

const SignIn = ({
  customerPortal,
}: {
  customerPortal?: Result<
    {
      domain: string;
      logo: string;
    },
    string
  >;
}) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { setNotification } = useNotification();

  const customerPortalContent = customerPortal?.data || undefined;

  return (
    <AuthForm
      handleEmailSubmit={async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          setNotification("Error logging in. Please try again.", "error");
          console.error(error);
          return;
        }
        setNotification("Success. Redirecting...", "success");
        router.push("/dashboard");
      }}
      handleGoogleSubmit={async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
        });
        if (error) {
          setNotification("Error logging in. Please try again.", "error");
          console.error(error);
          return;
        }
        setNotification("Successfully signed in.", "success");
      }}
      handleGithubSubmit={async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "github",
        });
        if (error) {
          setNotification("Error logging in. Please try again.", "error");
          console.error(error);
          return;
        }
        setNotification("Successfully signed in.", "success");
      }}
      authFormType={"signin"}
      customerPortalContent={customerPortalContent}
    />
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = new SupabaseServerWrapper(context).getClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  if (isCustomerDomain(context.req.headers.host ?? "")) {
    const org = await supabaseServer
      .from("organization")
      .select("*")
      .eq("domain", context.req.headers.host)
      .single();
    if (org.data) {
      return {
        props: {
          customerPortal: ok({
            domain: org.data.domain,
            logo: org.data.logo_path,
          }),
        },
      };
    } else {
      return {
        props: {
          customerPortal: err("no org found"),
        },
      };
    }
  }
  return {
    props: {},
  };
};

export default SignIn;
