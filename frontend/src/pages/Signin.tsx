import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <Auth type="signin" />
      </div>
      <div>
        <Quote />
      </div>
    </div>
  );
};
