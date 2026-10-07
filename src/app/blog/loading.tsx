import {SymmetricWave} from "@/components/loading-ui/symmetric-wave";

export default function Loading() {
    return (
        <div className={"w-full h-full min-h-[50vh] flex items-center justify-center"}>
            <SymmetricWave />
        </div>
    );
}