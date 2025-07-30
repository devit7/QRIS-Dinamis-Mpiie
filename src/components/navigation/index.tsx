import ModeToggle from "../theme-button";

export default function NavigationComponent(){
    return(
        <div className="py-4 text-xl font-semibold text-foreground bg-background border-b border-dashed border-border">
            <div className="mx-auto px-10 lg:px-0 lg:max-w-[1200px] flex items-center justify-between">
            <h1>Qris Dinamis</h1>
            <ModeToggle  />
            </div>
        </div>
    )
}