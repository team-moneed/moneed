import Card from "../../components/Card";

const Vote = () => {

    const handleRaise = () => {
        console.log('오른다')
    }

    const handleLower = () => {
        console.log('내린다')
    }

    return (
        <>
            <Card
                onClick={handleRaise}
                title="오른다"
                cardImgages={"png"}
            >

            </Card>
            <Card
                onClick={handleLower}
                title="내린다"
                cardImgages={"png"}>
            </Card>
        </>
    );
};

export default Vote;