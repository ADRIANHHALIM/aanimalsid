import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;

    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && isSubscribed) {
        navigate("/");
      }
    };
    checkSession();

    // Listen for auth state changes to catch errors
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isSubscribed) return;

      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }

      if (event === "USER_UPDATED") {
        toast({
          title: "Email confirmed",
          description: "You can now sign in to your account",
        });
      }
      
      // Handle authentication errors
      if (event === "SIGNED_OUT") {
        // Check URL parameters for errors
        const error = new URLSearchParams(window.location.search).get("error");
        const errorDescription = new URLSearchParams(window.location.search).get("error_description");
        const errorCode = new URLSearchParams(window.location.search).get("code");
        
        // Check both URL parameters and direct auth response
        if (error === "email_not_confirmed" || errorCode === "email_not_confirmed" || errorDescription?.includes("Email not confirmed")) {
          toast({
            title: "Email Confirmation Required",
            description: "Please check your email and click the confirmation link before signing in.",
            variant: "destructive",
          });
        } else if (error === "invalid_credentials" || errorDescription?.includes("Invalid login credentials")) {
          toast({
            title: "Invalid Credentials",
            description: "The email or password you entered is incorrect. Please try again.",
            variant: "destructive",
          });
        }
      }
    });

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, [toast, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#E95901]">Welcome to Animals.Id</h2>
          <p className="mt-2 text-gray-600">Sign in to continue</p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#E95901',
                  brandAccent: '#FFD377',
                }
              }
            }
          }}
          providers={["google", "facebook"]}
          redirectTo={`${window.location.origin}/`}
        />
      </div>
    </div>
  );
};

export default Login;