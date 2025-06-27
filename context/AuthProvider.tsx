import { Session } from "@supabase/supabase-js"
import { createContext ,PropsWithChildren, useContext, useEffect, useState } from "react"
import { supabase } from "@/supabase"
import { router, SplashScreen } from "expo-router"
import { AppState } from "react-native"

SplashScreen._internal_preventAutoHideAsync()

AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh()
    else supabase.auth.stopAutoRefresh()
})

const AuthContext = createContext({ session: null as Session | null, isLoading: true  })

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession()
        .then(({ data: { session } }) => {
            setSession(session)
            setIsLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription?.unsubscribe()
    },[])

    useEffect(() => {
        if (!isLoading) {
            // ถ้ามี session ไปหน้าหลัก ถ้าไม่มีไปหน้า login หรือหน้าหลัก
            router.replace("/(tabs)")
            setTimeout(() => SplashScreen.hideAsync(), 500)
        }
    }, [isLoading])

    if (isLoading) {
        return null // หรือแสดง loading component
    }

    return (
        <AuthContext.Provider value={{ session, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}