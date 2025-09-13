import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ThankYou() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("txn-id");

    document.cookie = "basket_ident=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "basketVerified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return (
        <main className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 my-5">
            <section className="w-full max-w-xl rounded-2xl bg-white shadow-lg p-8 bg-transparent">

                <h1 className="text-2xl font-semibold text-gray-900 text-center">
                    Thank you for your purchase!
                </h1>

                <p className="mt-3 text-center text-gray-600">
                    We appreciate your order from <span className="font-medium">GTAModStation.com</span>.
                    Your assets will be delivered to your email inbox at your email! shortly.
                </p>

                {orderId ? (
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Transection ID: <span className="font-mono">{orderId}</span>
                    </p>
                ) : null}

                <div className="row g-3">
                    <div className="col-4"></div>
                    <div className="col-5 mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Delivery usually completes within a few minutes.</li>
                            <li>Check your spam/junk folder if you don’t see the email.</li>
                            <li>
                                Need help? Contact us at{" "}
                                <a href={`mailto:support@gtamodstation.com`} className="underline">
                                    support@gtamodstation.com
                                </a>.
                            </li>
                        </ul>
                    </div>
                    <div className="col-3"></div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 text-center">
                    <Link
                        to="/"
                        className="btn btn-success"
                    >
                        Return to Home
                    </Link>
                </div>
            </section>
        </main>
    );
}
