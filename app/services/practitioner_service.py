from app.models.practitioner_model import Practitioner


def create_practitioner(db, practitioner):

    new_practitioner = Practitioner(
        name=practitioner.name,
        specialization=practitioner.specialization
    )

    db.add(new_practitioner)
    db.commit()
    db.refresh(new_practitioner)

    return new_practitioner