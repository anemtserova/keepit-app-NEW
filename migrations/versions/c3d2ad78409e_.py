"""empty message

Revision ID: c3d2ad78409e
Revises: 2f03a57d33ee
Create Date: 2021-10-09 16:33:28.391365

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3d2ad78409e'
down_revision = '2f03a57d33ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'is_active')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###